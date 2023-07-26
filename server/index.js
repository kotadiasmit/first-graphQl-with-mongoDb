import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mongoose from "mongoose";
import { todoController } from "./controller.js";
const app = express();
const port = 4000;

const { getAllTodo } = todoController;
// In-memory data store
mongoose
  .connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect To MongoDB Database");
  })
  .catch((err) => console.log(err));
// Schema
const typeDefs = `
type Query {
  todos: [todo]
}

type todo {
  id: ID!
  text: String!
  isChecked: Boolean!
}
`;
// Resolver for warriors
const resolvers = {
  Query: {
    todos: () => {
      console.log();
      return getAllTodo();
    },
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entrypoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`);
});
