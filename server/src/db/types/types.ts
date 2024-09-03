import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  companyName!: string;

  @Column('varchar', { length: 255, unique: true })
  wallet!: string;

  @OneToMany(() => Event, (event) => event.vendor)
  events!: Event[];
}

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('text')
  description!: string;

  @Column('timestamp')
  dateTime!: Date;

  @Column('varchar', { length: 255 })
  location!: string;

  @Column('int')
  availableTickets!: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.events)
  @JoinColumn({ name: 'vendorId' })
  vendor!: Vendor;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets!: Ticket[];
}

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  wallet!: string;

  @Column('text')
  jwkProof!: string;

  @Column('boolean', { default: false })
  isUsed!: boolean;

  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn({ name: 'eventId' })
  event!: Event;
}
