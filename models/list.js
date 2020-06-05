const list = (sequelize, DataTypes) => {
  return sequelize.define(
    "NMPSC_TROUBLE",
    {
      No: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
      },
      Block: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Trouble: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Cause: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};

module.exports = list;
