const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Ensure database directory and file exist
const initDb = () => {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(
      dbPath,
      JSON.stringify(
        {
          users: [],
          appointments: [],
          contents: [],
          media: [],
        },
        null,
        2
      )
    );
  }
};

initDb();

const readDB = () => {
  try {
    initDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading mock database:', err);
    return { users: [], appointments: [], contents: [], media: [] };
  }
};

const writeDB = (data) => {
  try {
    initDb();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing mock database:', err);
  }
};

const generateId = () => {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

// Map mongoose model names to db collection keys
const getCollectionKey = (modelName) => {
  const mapping = {
    User: 'users',
    Appointment: 'appointments',
    Content: 'contents',
    Media: 'media',
  };
  return mapping[modelName] || modelName.toLowerCase() + 's';
};

const registeredModels = {};

class Schema {
  constructor(definition, options) {
    this.definition = definition;
    this.options = options || {};
    this.preHooks = {};
    this.methods = {};
    this.virtuals = {};
  }

  pre(hookName, fn) {
    if (!this.preHooks[hookName]) {
      this.preHooks[hookName] = [];
    }
    this.preHooks[hookName].push(fn);
  }

  method(name, fn) {
    this.methods[name] = fn;
  }
}

Schema.Types = {
  ObjectId: String,
  String: String,
  Number: Number,
  Date: Date,
  Boolean: Boolean,
};

class Query {
  constructor(modelName, filterFn) {
    this.modelName = modelName;
    this.collectionKey = getCollectionKey(modelName);
    this.filterFn = filterFn;
    this._populateOptions = [];
    this._sortOption = null;
    this._limitOption = null;
    this._skipOption = null;
    this._selectOption = null;
  }

  populate(path, select) {
    this._populateOptions.push({ path, select });
    return this;
  }

  sort(sortOption) {
    this._sortOption = sortOption;
    return this;
  }

  limit(limitOption) {
    this._limitOption = limitOption;
    return this;
  }

  skip(skipOption) {
    this._skipOption = skipOption;
    return this;
  }

  select(selectOption) {
    this._selectOption = selectOption;
    return this;
  }

  async execute() {
    const db = readDB();
    const rawItems = db[this.collectionKey] || [];
    let items = rawItems.filter(this.filterFn);

    // Sort
    if (this._sortOption) {
      let field = '';
      let desc = false;
      if (typeof this._sortOption === 'string') {
        desc = this._sortOption.startsWith('-');
        field = desc ? this._sortOption.substring(1) : this._sortOption;
      } else if (typeof this._sortOption === 'object') {
        field = Object.keys(this._sortOption)[0];
        desc = this._sortOption[field] === -1 || this._sortOption[field] === 'desc';
      }

      if (field) {
        items.sort((a, b) => {
          let valA = a[field];
          let valB = b[field];
          if (valA === undefined) valA = '';
          if (valB === undefined) valB = '';
          if (typeof valA === 'string') valA = valA.toLowerCase();
          if (typeof valB === 'string') valB = valB.toLowerCase();
          if (valA < valB) return desc ? 1 : -1;
          if (valA > valB) return desc ? -1 : 1;
          return 0;
        });
      }
    }

    // Skip
    if (this._skipOption) {
      items = items.slice(this._skipOption);
    }

    // Limit
    if (this._limitOption !== null && this._limitOption !== undefined) {
      items = items.slice(0, this._limitOption);
    }

    // Instantiate model items
    const ModelClass = registeredModels[this.modelName];
    let models = items.map((item) => new ModelClass(item));

    // Populate
    if (this._populateOptions.length > 0) {
      for (const pop of this._populateOptions) {
        const pathField = pop.path;
        // Find if schema lists a ref
        const schema = ModelClass.schema;
        let refModelName = 'User'; // Default fallback
        if (schema && schema.definition[pathField]) {
          refModelName = schema.definition[pathField].ref || 'User';
        }

        const refModelClass = registeredModels[refModelName];
        if (refModelClass) {
          const refCollectionKey = getCollectionKey(refModelName);
          const refItems = db[refCollectionKey] || [];

          for (const m of models) {
            const foreignId = m[pathField];
            if (foreignId) {
              const foreignRawDoc = refItems.find((x) => x._id === foreignId.toString());
              if (foreignRawDoc) {
                const popDoc = new refModelClass(foreignRawDoc);
                if (pop.select) {
                  const filtered = { _id: popDoc._id };
                  const selects = pop.select.split(' ');
                  selects.forEach((s) => {
                    if (s.startsWith('-')) {
                      // exclude handled by copying select
                    } else if (s) {
                      filtered[s] = popDoc[s];
                    }
                  });
                  m[pathField] = filtered;
                } else {
                  m[pathField] = popDoc;
                }
              } else {
                m[pathField] = null;
              }
            }
          }
        }
      }
    }

    // Select
    if (this._selectOption) {
      const selects = this._selectOption.split(' ');
      const isExclude = selects.some((s) => s.startsWith('-'));

      models = models.map((m) => {
        const obj = {};
        if (isExclude) {
          const excludes = selects.map((s) => s.substring(1));
          Object.keys(m).forEach((key) => {
            if (!excludes.includes(key)) {
              obj[key] = m[key];
            }
          });
        } else {
          obj._id = m._id;
          selects.forEach((s) => {
            if (s && s !== '_id') {
              obj[s] = m[s];
            }
          });
        }
        // Preserve methods
        Object.setPrototypeOf(obj, Object.getPrototypeOf(m));
        return obj;
      });
    }

    return models;
  }

  then(onResolve, onReject) {
    return this.execute().then(onResolve, onReject);
  }
}

class SingleQuery extends Query {
  async execute() {
    const results = await super.execute();
    return results.length > 0 ? results[0] : null;
  }
}

const createModelClass = (modelName, schema) => {
  class Model {
    constructor(data) {
      Object.assign(this, data);
      if (!this._id) {
        this._id = generateId();
      }
      if (!this.createdAt) {
        this.createdAt = new Date().toISOString();
      }
      this.updatedAt = new Date().toISOString();

      // Attach schema methods
      if (schema && schema.methods) {
        Object.keys(schema.methods).forEach((methodName) => {
          this[methodName] = schema.methods[methodName].bind(this);
        });
      }
    }

    isModified(field) {
      if (field === 'password') {
        // If password is not a bcrypt hash, treat as modified
        return this.password && !this.password.startsWith('$2a$') && !this.password.startsWith('$2b$');
      }
      return true;
    }

    async save() {
      // Run pre-save hooks
      if (schema && schema.preHooks && schema.preHooks['save']) {
        for (const hook of schema.preHooks['save']) {
          await hook.call(this);
        }
      }

      const db = readDB();
      const collKey = getCollectionKey(modelName);
      if (!db[collKey]) db[collKey] = [];

      const index = db[collKey].findIndex((x) => x._id === this._id);
      const dataToSave = {};
      Object.keys(this).forEach((k) => {
        if (typeof this[k] !== 'function') {
          dataToSave[k] = this[k];
        }
      });

      dataToSave.updatedAt = new Date().toISOString();

      if (index !== -1) {
        db[collKey][index] = dataToSave;
      } else {
        db[collKey].push(dataToSave);
      }

      writeDB(db);
      return this;
    }

    static async create(data) {
      const docs = Array.isArray(data) ? data : [data];
      const savedDocs = [];

      for (const d of docs) {
        const inst = new Model(d);
        await inst.save();
        savedDocs.push(inst);
      }

      return Array.isArray(data) ? savedDocs : savedDocs[0];
    }

    static find(queryObj = {}) {
      const filterFn = (item) => {
        return Object.keys(queryObj).every((key) => {
          if (queryObj[key] && typeof queryObj[key] === 'object' && '$ne' in queryObj[key]) {
            return item[key] !== queryObj[key].$ne;
          }
          if (item[key] === undefined && queryObj[key] === null) return true;
          return String(item[key]) === String(queryObj[key]);
        });
      };
      return new Query(modelName, filterFn);
    }

    static findOne(queryObj = {}) {
      const filterFn = (item) => {
        return Object.keys(queryObj).every((key) => {
          return String(item[key]) === String(queryObj[key]);
        });
      };
      return new SingleQuery(modelName, filterFn);
    }

    static findById(id) {
      return new SingleQuery(modelName, (item) => String(item._id) === String(id));
    }

    static async findByIdAndUpdate(id, update, options = {}) {
      const db = readDB();
      const collKey = getCollectionKey(modelName);
      const items = db[collKey] || [];
      const index = items.findIndex((x) => String(x._id) === String(id));

      if (index === -1) return null;

      const current = items[index];
      const updatedData = { ...current };

      const updateFields = update.$set || update;
      Object.keys(updateFields).forEach((k) => {
        updatedData[k] = updateFields[k];
      });

      updatedData.updatedAt = new Date().toISOString();
      items[index] = updatedData;
      db[collKey] = items;
      writeDB(db);

      return new Model(updatedData);
    }

    static async findOneAndUpdate(queryObj, update, options = {}) {
      const db = readDB();
      const collKey = getCollectionKey(modelName);
      const items = db[collKey] || [];

      const filterFn = (item) => {
        return Object.keys(queryObj).every((key) => {
          return String(item[key]) === String(queryObj[key]);
        });
      };

      const index = items.findIndex(filterFn);

      if (index === -1) {
        if (options.upsert) {
          const newDoc = { _id: generateId(), ...queryObj };
          const updateFields = update.$set || update;
          Object.assign(newDoc, updateFields);
          newDoc.createdAt = new Date().toISOString();
          newDoc.updatedAt = new Date().toISOString();
          items.push(newDoc);
          db[collKey] = items;
          writeDB(db);
          return new Model(newDoc);
        }
        return null;
      }

      const current = items[index];
      const updatedData = { ...current };
      const updateFields = update.$set || update;
      Object.keys(updateFields).forEach((k) => {
        updatedData[k] = updateFields[k];
      });

      updatedData.updatedAt = new Date().toISOString();
      items[index] = updatedData;
      db[collKey] = items;
      writeDB(db);

      return new Model(updatedData);
    }

    static async findOneAndDelete(queryObj) {
      const db = readDB();
      const collKey = getCollectionKey(modelName);
      const items = db[collKey] || [];

      const filterFn = (item) => {
        return Object.keys(queryObj).every((key) => {
          return String(item[key]) === String(queryObj[key]);
        });
      };

      const index = items.findIndex(filterFn);
      if (index === -1) return null;

      const deleted = items.splice(index, 1)[0];
      db[collKey] = items;
      writeDB(db);

      return new Model(deleted);
    }

    static async findByIdAndDelete(id) {
      const db = readDB();
      const collKey = getCollectionKey(modelName);
      const items = db[collKey] || [];
      const index = items.findIndex((x) => String(x._id) === String(id));

      if (index === -1) return null;

      const deleted = items.splice(index, 1)[0];
      db[collKey] = items;
      writeDB(db);

      return new Model(deleted);
    }

    static async countDocuments(queryObj = {}) {
      const db = readDB();
      const collKey = getCollectionKey(modelName);
      const items = db[collKey] || [];

      const filterFn = (item) => {
        return Object.keys(queryObj).every((key) => {
          return String(item[key]) === String(queryObj[key]);
        });
      };

      return items.filter(filterFn).length;
    }
  }

  Model.schema = schema;
  return Model;
};

const mongooseMock = {
  Schema,
  model: (name, schema) => {
    if (registeredModels[name]) {
      return registeredModels[name];
    }
    const modelClass = createModelClass(name, schema);
    registeredModels[name] = modelClass;
    return modelClass;
  },
  connect: async (uri) => {
    console.log('🔌 Mock MongoDB Connected successfully to local JSON file db!');
    return {
      connection: {
        host: 'localhost/mock-json-db',
      },
    };
  },
  connection: {
    host: 'localhost/mock-json-db',
    on: (event, fn) => {
      if (event === 'connected') fn();
    },
    once: (event, fn) => {
      if (event === 'open') fn();
    },
  },
  Types: {
    ObjectId: class ObjectId {
      constructor(id) {
        this.id = id || generateId();
      }
      toString() {
        return this.id;
      }
    },
  },
  _models: registeredModels,
  _getCollection: (modelName) => {
    const db = readDB();
    return db[getCollectionKey(modelName)] || [];
  },
};

module.exports = mongooseMock;
