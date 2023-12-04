import { IGenericRepository } from "./crud.interface"
import connection from "../config/mysql"
import { ResultSetHeader, RowDataPacket } from "mysql2";
import AuditFields from "../models/AuditFields";

class RepositoryGeneric<T extends RowDataPacket> implements IGenericRepository<T> { 

    constructor(private tableName:string, private keyPrimary = "id") {
        
    };

    private isAnAuditFields(obj: any): obj is AuditFields {
        return 'created_at' in obj || 'updated_at' in obj;
      }

    save(entity: T) : Promise<T>{

        const keys: string[] = Object.keys(entity).filter(k => k !== this.keyPrimary);

        if(this.isAnAuditFields(entity)){
            entity.created_at = new Date();
            entity.updated_at = new Date();
        }

        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
              `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES(${keys.map( k=> "?").join(',')})`,
              Object.entries(entity).map(([key, value]) => {
                if(key !== this.keyPrimary)
                    return value
              }),
              (err, res) => {
                if (err) reject(err);
                else
                  this.getById(res.insertId)
                    .then((result) => resolve(result!))
                    .catch(reject);
              }
            );
        });
    };

    getAll(where: string = "", order:string = ""): Promise<T[]>{
        let query: string = `SELECT * FROM ${this.tableName}`;

        if (where.trim() !== "")
            query += ` WHERE = ${where}`;

        if (order.trim() !== "")
            query += ` WHERE = ${order}`;
        
        return new Promise((resolve, reject) => {
            connection.query<T[]>(query, (err, res) => {
            console.log(res);
            if (err) reject(err);
            else resolve(res as T[]);
            });
        });
    };

    getById(id: number | string): Promise<T | undefined>{
        return new Promise((resolve, reject) => {
            connection.query<T[]>(
              `SELECT * FROM ${this.tableName} WHERE id = ?`,
              [id],
              (err, res) => {
                if (err) reject(err);
                else resolve(res?.[0]);
              }
            );
          });
    };

    update(entity: T): Promise<number>{
        const keys: string[] = Object.keys(entity).filter(k => k !== this.keyPrimary).map(k => `${k} = ?`);

        if(this.isAnAuditFields(entity)){
            entity.updated_at = new Date();
        }

        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
                `UPDATE ${this.tableName} SET ${keys.join(',')} WHERE id = ?`,
                [ ...Object.entries(entity).map(([key, value]) => {
                    if(key !== this.keyPrimary)
                        return value
                }).filter(f => f !== undefined),  entity[this.keyPrimary]],
                (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
                }
            );
            });
    };

    delete(id: number | string): Promise<number>{
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
              `DELETE FROM ${this.tableName} WHERE id = ?`,
              [id.toString()],
              (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
              }
            );
          });
    };
}

export default RepositoryGeneric;