async function startServer(app, sequelize){
    sequelize.authenticate()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on  http://localhost:${PORT}`);
        });
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

module.exports= startServer
