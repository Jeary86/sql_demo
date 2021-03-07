'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const fields = await queryInterface.describeTable('user'); // 放到这个表中
        const t = await queryInterface.sequelize.transaction();

        try {
            if (!fields.hasOwnProperty('user_age')) {
                await queryInterface.addColumn('user', 'user_age', {
                    type: Sequelize.STRING,
                    allowNull: false
                }, { transaction: t });
            }
            await t.commit();
        } catch (err) {
            throw err;
        }
    },

    async down(queryInterface) {
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('user', 'user_age', { transaction: t });

            await t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }
};