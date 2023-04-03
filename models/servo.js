const db = require('../db')
const AppError = require('../lib/app_error')


class Note {
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

module.exports = Note