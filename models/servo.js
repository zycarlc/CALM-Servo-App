const db = require('../db')
const AppError = require('../lib/app_error')


class Servo {
    static  findAll () {
        return db.query("select * from stations;")
    }

    static findWithinRadius(coords, radius){
        let degree = radius / 110000

        const sql = `SELECT * FROM stations where ((latitude - coord.lat) * (latitude - coord.lat) + (longitude - coords.lng) * (longitude - coords.lng)) < degree * degree`


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

    static findWithinBounds(coords) {
        const sql = `SELECT * FROM stations where latitude > ${coords.latSW} AND latitude < ${coords.latNE} AND longitude > ${coords.lngSW} AND longitude < ${coords.lngNE}`
        return db.query(sql).then(res => res.rows)
    }

    static findWithinRadius(center, radius) {

        let newCoords = {
                latNE: center.lat + radius,
                lngNE: center.lng + radius,
                latSW: center.lat - radius,
                lngSW: center.lng - radius
        }

        const sql = `SELECT * FROM stations where latitude > ${newCoords.latSW} AND latitude < ${newCoords.latNE} AND longitude > ${newCoords.lngSW} AND longitude < ${newCoords.lngNE} LIMIT 700`
        return db.query(sql).then(res => res.rows)
    }
    
}

module.exports = Servo