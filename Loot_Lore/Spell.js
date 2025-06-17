export class Spell {
  constructor({
    name,
    desc,
    higher_level,
    range,
    components,
    material,
    ritual,
    duration,
    concentration,
    casting_time,
    level,
    attack_type,
    damage,
    school,
    classes,
    subclasses,
  }) {
    this.name = name;                         
    this.desc = desc;                         
    this.higher_level = higher_level;         
    this.range = range;                       
    this.components = components;             
    this.material = material;                 
    this.ritual = ritual;                     
    this.duration = duration;                 
    this.concentration = concentration;       
    this.casting_time = casting_time;         
    this.level = level;                       
    this.attack_type = attack_type;           
    this.damage = damage;                     
    this.school = school;                     
    this.classes = classes;                  
    this.subclasses = subclasses;             
  }
}
