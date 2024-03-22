const homepage = (req, res) => {
  const locals = {
    title: "Main Page",
  };

  res.render("index", { locals });
};

module.exports = { homepage };
