const homepage = (req, res) => {
  const locals = {
    title: "Main Page",
  };

  res.render("index", { locals, layout: "../views/layouts/front-page.ejs" });
};

const aboutpage = (req, res) => {
  const locals = {
    title: "About",
  };

  res.render("about", { locals });
};

module.exports = { homepage, aboutpage };
