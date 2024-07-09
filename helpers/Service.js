const mongoose = require('mongoose');

class Service {
    async create(model, data) {
        try {
            return await model.create(data);
        } catch (e) {
            throw new Error(`Error creating document: ${e.message}`);
        }
    }

    async getOne(id) {
        try {
            this.checkId(id);
            return await model.findById(id);
        } catch (e) {
            throw new Error(`Error getting document: ${id}`);
        }
    }

    async get() {
        try {
            return await model.find();
        } catch (e) {
            throw new Error('Error getting documents');
        }
    }

    async update(id, data) {
        try {
            this.checkId(id);
            const updatedDocument = await model.findByIdAndUpdate(id, data, { new: true });
            if (!updatedDocument) throw new Error(`Error updating document: ${id}`);
            return updatedDocument;
        } catch (e) {
            throw new Error(`Error updating document: ${id}`);
        }
    }

    async delete(id) {
        try {
            this.checkId(id)
            const deletedDocument = await model.findByIdAndDelete(id);
            if (!deletedDocument) throw new Error(`Error deleting document: ${id}`);
            return deletedDocument;
        } catch (e) {
            throw new Error(`Error deleting document: ${id}`);
        }
    }

     checkId(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid ID format');
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = Service;