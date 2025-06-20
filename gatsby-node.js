const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: false,
        stream: false,
      },
    },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WeeklyYaml implements Node {
      version: String!
      date: Date
      banner: String
      changes: [WeeklyChange!]!
    }

    type LtsYaml implements Node {
      version: String!
      date: Date
      lts_predecessor: String
      lts_baseline: String
      lts_changes: [LtsChange!]
      changes: [LtsChange!]!
    }

    type WeeklyChange {
      type: String
      message: String!
      issue: String
      pull: String
      url: String
      title: String
      references: [ChangeReference!]
    }

    type LtsChange {
      type: String
      message: String!
      issue: String
      pull: String
      url: String
      title: String
      references: [ChangeReference!]
    }

    type ChangeReference {
      issue: String
      pull: String
      url: String
      title: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const weeklyResult = await graphql(`
    {
      allWeeklyYaml {
        nodes {
          version
        }
      }
    }
  `)

  if (weeklyResult.errors) {
    throw weeklyResult.errors
  }

  weeklyResult.data.allWeeklyYaml.nodes.forEach(node => {
    createPage({
      path: `/changelog/${node.version}/`,
      component: path.resolve("./src/templates/ChangelogEntry.js"),
      context: {
        version: node.version,
        type: "weekly",
      },
    })
  })

  const ltsResult = await graphql(`
    {
      allLtsYaml {
        nodes {
          version
        }
      }
    }
  `)

  if (ltsResult.errors) {
    throw ltsResult.errors
  }

  ltsResult.data.allLtsYaml.nodes.forEach(node => {
    createPage({
      path: `/changelog-stable/${node.version}/`,
      component: path.resolve("./src/templates/ChangelogEntry.js"),
      context: {
        version: node.version,
        type: "stable",
      },
    })
  })
}
