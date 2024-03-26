const dashboardPage = (req, res) => {
  const locals = {
    title: "Dashboard",
  };

  res.render("dashboard", { locals, layout: "../views/layouts/dashboard.ejs" });
};

module.exports = { dashboardPage };
