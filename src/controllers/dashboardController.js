const { default: mongoose } = require("mongoose");
const Note = require("../models/Notes");

const dashboardPage = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
  };

  // async function insertData() {
  //   try {
  //     await Note.insertMany([
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title:
  //           "In this tutorial, we are going to create a simple, accessible and responsive navigation menu bar and side menu using TailwindCSS v3.0 and Alpine.js. For those of you who would prefer a Video Tutorial you can watch it here.",
  //         body: "Let's look into JS animations",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title:
  //           "Create Responsive Side Navigation using TailwindCSS and AlpineJs",
  //         body: "Let's look into JS animations",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "JavaScript Animations",
  //         body: "JavaScript Animations are pretty cool.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "JavaScript Async Await",
  //         body: "In this short tutorial, I will re-use some of the code I wrote for a YouTube tutorial creating an Apex Legend-inspired menu. I will make a simple function that fetches data from a dummy API and display some of it on the page.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "How To Use DOTENV",
  //         body: "Node.js runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "MongoDB Tutorial",
  //         body: "Node.js is an open-source server environment. Node.js is cross-platform and runs on Windows Linux Unix and macOS. Node.js is a back-end JavaScript runtime environment. Node.js runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "Learn Morgan",
  //         body: "Morgan is a Node.js middleware to log HTTP requests. Monitoring and reading logs can help you better understand how your application behaves.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "Build a React Portfolio with TailwindCSS",
  //         body: "Learn how to add TailwindCSS to your React project and build a portfolio with Tailwind's grid layouts, typography, and responsive design.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "How to configure ESLint for a Node.Js Project",
  //         body: "When you work in a team or a slightly larger project its important to have a consistent style across all files. With this guide, you'll be able to set up auto linting focused on Node.Js projects using the AirBnB style guide.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "React A JavaScript library for building user interfaces",
  //         body: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "Angular is awesome",
  //         body: "Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers who build compelling user interfaces ...",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "Vue.js - The Progressive JavaScript Framework",
  //         body: "Vue.js is an open-source model view viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //       {
  //         user: "6602e34df6b7c179f0973ae8",
  //         title: "Build fast, responsive sites with Bootstrap",
  //         body: "Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components, and bring projects to life with powerful JavaScript plugins.",
  //         createdAt: "1671634422539",
  //         updatedAt: "1671634422539",
  //       },
  //     ]);
  //   } catch (error) {
  //     console.log("err", +error);
  //   }
  // }

  // insertData();

  console.log(req.user);

  try {
    const notes = await Note.aggregate([
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage);

    const count = await Note.countDocuments();

    res.render("dashboard", {
      userName: req.user.firstName,
      locals,
      notes,
      current: page,
      layout: "../views/layouts/dashboard.ejs",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const dashboardViewPage = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById({ _id: id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-notes", {
      noteID: id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Something went wrong");
  }
};

const dashboardUpdatePage = async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findOneAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now(),
      }
    ).where({ user: req.user.id });
  } catch (error) {
    res.send("Something went wrong");
  }

  res.redirect("/dashboard");
};

const dashboardDeleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.deleteOne({ _id: id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    res.send("Something went wrong");
  }
};

const dashboardAddNote = async (req, res) => {
  res.render("dashboard/add-note", {
    layout: "../views/layouts/dashboard",
  });
};

const dashboardSubmitNote = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    res.send("Something went wrong");
  }
};
const dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    res.send("Something went wrong");
  }
};
const dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};

module.exports = {
  dashboardPage,
  dashboardAddNote,
  dashboardSubmitNote,
  dashboardViewPage,
  dashboardUpdatePage,
  dashboardDeleteNote,
  dashboardSearch,
  dashboardSearchSubmit,
};
