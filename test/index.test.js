const chai = require("chai");
const chatHttp = require("chai-http");
require("chai/register-should");
const app = require("../app");

chai.use(chatHttp);
const expect = chai.expect;

describe("Testing get all packages list: ", () => {
    it("should getting all packages list", done => {

        chai
            .request(app)
            .get("/package")
            .set("Accept", "application/json")
            .end((err, res)=> {
                expect(res.status).to.equal(200);
            });
            done();
    });
});

describe("Testing get package by id: ", () => {
    it("should getting package by id", done => {
        const idPackage = '2937bdbf-315e-4c5e-b139-fd39a3dfd15f';
        chai
            .request(app)
            .get("/package/" + idPackage)
            .set("Accept", "application/json")
            .end((err, res)=> {
                expect(res.status).to.equal(200);
            });
            done();
    });
});

describe("Testing insert package: ", () => {
    it("should inserting package", done => {
        const koli = {
            "koli_length": 0,
            "awb_url": "https://tracking.mile.app/label/AWB00100209082020.3",
            "created_at": "2020-07-15 11:11:13",
            "koli_chargeable_weight": 2,
            "koli_width": 0,
            "koli_surcharge": [],
            "koli_height": 0,
            "updated_at": "2020-07-15 11:11:13",
            "koli_description": "TEST LID HOT CUP",
            "koli_formula_id": null,
            "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
            "koli_volume": 0,
            "koli_weight": 2,
            "koli_id": "2937bdbf-315e-4c5e-b139-fd39a3dfd12111",
            "koli_custom_field": {
                "awb_sicepat": null,
                "harga_barang": null
            },
            "koli_code": "TEST00100209082020.3"
        }
        
        chai
            .request(app)
            .post("/package/")
            .send(koli)
            .set("Accept", "application/json")
            .end((err, res)=> {
                expect(res.status).to.equal(200);
            });
            done();
    });
});

describe("Testing update with method put package: ", () => {
    it("should updating package", done => {
        const idPackage = 'e2cb6d86-0bb9-409b-a1f0-389ed4f2df2d';
        const koli = {
            "koli_length": 0,
            "awb_url": "https://tracking.mile.app/label/AWB00100209082020.3",
            "created_at": "2020-07-15 11:11:13",
            "koli_chargeable_weight": 2,
            "koli_width": 0,
            "koli_surcharge": [],
            "koli_height": 0,
            "updated_at": "2020-07-15 11:11:13",
            "koli_description": "TEST LID HOT CUP",
            "koli_formula_id": null,
            "connote_id": "f70670b1-c3ef-4caf-bc4f-eefa702092ed",
            "koli_volume": 0,
            "koli_weight": 2,
            "koli_custom_field": {
                "awb_sicepat": null,
                "harga_barang": null
            },
            "koli_code": "TEST00100209082020.3"
        }
        
        chai
            .request(app)
            .put("/package/"+ idPackage)
            .send(koli)
            .set("Accept", "application/json")
            .end((err, res)=> {
                expect(res.status).to.equal(200);
            });
            done();
    });
});



describe("Testing update with method patch package: ", () => {
    it("should updating package", done => {
        const idPackage = 'e2cb6d86-0bb9-409b-a1f0-389ed4f2df2d';
        const koli = {
            "koli_length": 5,
            
        }
        
        chai
            .request(app)
            .patch("/package/"+ idPackage)
            .send(koli)
            .set("Accept", "application/json")
            .end((err, res)=> {
                expect(res.status).to.equal(200);
            });
            done();
    });
});


describe("Testing delete with method patch package: ", () => {
    it("should deleting package", done => {
        const idPackage = 'e2cb6d86-0bb9-409b-a1f0-389ed4f2df2d';
        
        chai
            .request(app)
            .delete("/package/"+ idPackage)
            .set("Accept", "application/json")
            .end((err, res)=> {
                expect(res.status).to.equal(200);
            });
            done();
    });
});