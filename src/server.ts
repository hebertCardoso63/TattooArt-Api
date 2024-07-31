import { App } from "./app"

const { PORT } = process.env;

const app = new App();

const port = PORT || 3000;

app.server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});