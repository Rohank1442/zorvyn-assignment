const { Op } = require("sequelize");
const Record = require("../models/record.model");

exports.getAllRecords = async (query) => {
    const {
        page = 1,
        limit = 10,
        type,
        category,
        startDate,
        endDate,
    } = query;

    const offset = (page - 1) * limit;

    const where = { isActive: true }; 

    if (type) where.type = type;
    if (category) where.category = category;

    if (startDate && endDate) {
        where.date = {
            [Op.between]: [startDate, endDate],
        };
    }

    const { rows, count } = await Record.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
    });

    return {
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
        records: rows,
    };
};

exports.getRecordById = async (id) => {

    const record = await Record.findOne({
        where: { id, isActive: true }
    });
    
    if (!record) throw new Error("Record not found or has been deleted");
    return record;
};

exports.createRecord = async (data, userId) => {
    const record = await Record.create({
        ...data,
        createdBy: userId,
        isActive: true
    });

    return record;
};

exports.updateRecord = async (id, data, user) => {

    const record = await Record.findOne({
        where: { id, isActive: true }
    });

    if (!record) throw new Error("Record not found or has been deleted");

    if (user.role !== "admin" && record.createdBy !== user.id) {
        throw new Error("You can only update your own records");
    }

    await record.update(data);
    return record;
};

exports.deleteRecord = async (id, user) => {
    const record = await Record.findOne({
        where: { id, isActive: true }
    });

    if (!record) throw new Error("Record not found or already deleted");

    if (user.role !== "admin" && record.createdBy !== user.id) {
        throw new Error("You can only delete your own records");
    }

    await record.update({ isActive: false });
};