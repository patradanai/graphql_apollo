const list = (sequelize, DataTypes) => {
  return sequelize.define(
    "NMPSC_TROUBLE",
    {
      No: {
        type: DataTypes.TEXT(10),
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
      tableName: "NMPSC_TROUBLE",
      timestamps: false,
    }
  );
};

module.exports = list;
