const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
});

/* Method to return a list of farmers based on the parameter passed */
const getFarmerByParameter = (request, response) => {
    const parameter = request.params.data;

    /* Query with two inner joins to return the document and the address from the farmer */
    pool.query("SELECT f.name, a.street, a.state, a.address, a.country, d.documentnumber, d.documenttype FROM farmer f inner join address a on f.address = a.addressid INNER JOIN document d on f.document = d.documentid WHERE (f.name LIKE '%' || $1 || '%') OR (d.documentnumber = $1)", [parameter], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getFarmerByParameter
}