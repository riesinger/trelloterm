# TrelloTerm

This is a simple terminal UI for Trello. Note that this project is in no way associated with Trello
or Atlassian.

This project is in its very early stages, so not many features are implemented.

## Using TrelloTerm

### Installing

```
git clone https://github.com/riesinger/trelloterm
cd trelloterm
npm install
```

### Running

To run TrelloTerm with `ts-node`, do:

```
npm start
```

Note that you'll need to have your Trello API key and token in your environment as `TRELLO_KEY` and
`TRELLO_TOKEN`. You can generate tokens [here](https://trello.com/app-key). You might want to put
them into a `.env` file when you're aiding in TrelloTerm development.

At some point, TrelloTerm will be able to generate credentials for you and store in the file system.

To run with `nodemon` (restart on changes), do:

```
npm run dev
```

### Building

To compile to JS, do:

```
npm run build
```

