import { Weapon } from "./Weapon";


export abstract class Character {
  public readonly name: string;
  public readonly maxHealth: number;
  public readonly baseAttack:number;
  public readonly baseDefense:number;
  private _health:number;
  private _weapon:Weapon | null;

  public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
    if (health < 0) {
        throw new Error(`The health of ${name} must be strictly positive`);
    }
    this.name = name;
    this.maxHealth = health;
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
    this._health = health;
  }

  public get health(): number {
    return this._health;
  }

  public abstract getAttack(): number;

  public abstract canEquip(weapon: Weapon): boolean;

  protected getWeaponAttackBonus(): number {
    return this.baseAttack;
  }

  public isAlive(): boolean {
    return true;
  }

  public describe(): string {
    return `${this.name} - health ${this._health}/${this.maxHealth} - attack ${this.baseAttack} - defense ${this.baseDefense} - weapon: ${this._weapon}`
  }

  public equip(weapon: Weapon): void {
    throw new Error(`${this.name} cannot equip ${weapon}`);
  }

  public takeDamage(amount: number): void {
    if (this.health > 0) {
        this.health - amount;
    }
  }

  public heal(amount: number): void {
    if (this.health< this.maxHealth) {
        amount + this.maxHealth;
    }
  }

  protected computeDamage(target: Character): number {
    if ( target.health > 0) {
        return this.baseAttack - this.baseDefense;
    }
  }

  public attack(target: Character): number {
    if (this.health <= 0) {
        throw new Error(`${this.name} is KO and cannot attack.`);
    }
    if (target === this.name) {
        throw new Error(`${this.name} cannot attack themselves.`);
    }
  }
}
