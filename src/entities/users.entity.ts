import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Schedule } from "./schedules.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt?: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt?: Date | string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt?: Date | string | null | undefined;

  @OneToMany(() => Schedule, (Schedule) => Schedule.user)
  schedule: Schedule;
  @BeforeInsert()
  @BeforeUpdate()
  transformPasswordHash() {
    const password = getRounds(this.password);

    if (!password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
