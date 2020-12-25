const preview = require('./preview.json');
const worldMap = require('./world_50m.json');
const world605k = require('./world_605kb.json');
const s26Line = require('./s26_line.json');

const excel_all = require('./excel/all.json');
const excel_data = require('./excel/data.json');
const excel_column = require('./excel/column.json');

const scatter_weibo = require('./json/scatter_weibo.json');
const sankey_energy = require('./json/sankey_energy.json');
module.exports = function (app) {
    //获取用户信息
    app.get('/mockPreview', function (rep, res) {
        res.json(preview);
    });

    app.get('/json/scatter_weibo.json', function (rep, res) {
        res.json(scatter_weibo);
    });

    app.get('/json/sankey_energy.json', function (rep, res) {
        res.json(sankey_energy);
    });

    app.get('/world_50m.json', function (req, res) {
        res.json(worldMap);
    });

    app.get('/s26_line.json', function (req, res) {
        res.json(s26Line);
    });

    app.get('/world_605kb.json', function (req, res) {
        res.json(world605k);
    });


    app.get('/excel_all.json', function (req, res) {
        res.json(excel_all);
    });
    app.get('/excel_data.json', function (req, res) {
        res.json(excel_data);
    });
    app.get('/excel_column.json', function (req, res) {
        res.json(excel_column);
    });

}