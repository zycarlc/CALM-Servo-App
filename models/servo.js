const db = require('../db')
const AppError = require('../lib/app_error')


class Servo {
    static  findAll () {
        return db.query("select * from stations;")
    }

    static findOneById (id) {
        let sql = "select * from stations where id = $1"
        return db.query(sql, [id])
            .then(res => {
                if (res.rows.length === 0) {
                    throw new AppError(404, "recode not found")
                }
                return res.rows[0]
            })
    }

    static findAllOwners () {
        return db.query("SELECT DISTINCT station_owner FROM stations;")
            .then(res => {
                if (res.rows.length === 0) {
                    throw new AppError(404, "recode not found")
                }
                return res.rows
            })
    }

    static findOneRandomly () {
        return db.query("SELECT * FROM stations TABLESAMPLE system_rows(1);")
            .then(res => res.rows[0])
    }

    static getStats () {
        let stationOwners = []
        let total_owners;
        let total_stations;
        return this.findAllOwners()
            .then(owners => {
                total_owners = owners.length
                return owners.map(row => row.station_owner)
            })
            .then(owners => {
                owners.forEach(owner => {
                    stationOwners.push(db.query(`SELECT COUNT(station_owner) FROM stations WHERE station_owner = '${owner}'`)
                    .then(res => {
                        return { owner, "total": res.rows[0].count }
                        })
                    )
                })
                return Promise.all(stationOwners)
            })
            .then(res => {
                total_stations = res.reduce((acc, owner) => acc + Number(owner.total), 0)
                return {
                    owners: res.filter(station => station.total > 1)
                                .sort((a, b) => b.total - a.total),
                    total_owners,
                    total_stations
                }
            })
    }

    // static create (newNote) {
    //     let sql = `insert into stations (content, content_html, color) values ($1, $2, $3) returning *;`
    //     return db.query(sql, [
    //         newNote.content, md.render(newNote.content), newNote.color
    //     ]).then(dbRes => dbRes.rows[0])
    // }

    // static update (id, newNote) {
    //     let sql = `update stations set content = $2, content_html = $3, color = $4 where id = $1;`
    //     return db.query(sql, [id, newNote.content, md.render(newNote.content), newNote.color])
    // }

    // static destroy (id) {
    //     let sql = `delete from stations where id = $1`
    //     return db.query(sql, [id])
    // }
}

module.exports = Servo