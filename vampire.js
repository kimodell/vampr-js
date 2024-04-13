class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    let totalOffspring = 0;

    this.offspring.forEach((offspring) => {
      totalOffspring++;
    });

    return totalOffspring;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVamp = this;

    //if the current vamp has a valid creator
    while (currentVamp.creator) {
      //update the current vamp to the create of the next vamp in the line and increase the count
      currentVamp = currentVamp.creator;
      numberOfVamps++;
    }

    return numberOfVamps;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      const vampFound = offspring.vampireWithName(name);
      if (vampFound) {
        return vampFound;
      }
    }
  
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVamps = 0;
    
    //use recursion to iterate through each offspring
    for (let descendent of this.offspring) {
      //add 1 to the total for this specific offspring and then add total descendants of this offspring
      totalVamps += 1 + descendent.totalDescendents;
    }  
    return totalVamps;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
    
    //if this vamps conversion year is later than 1980, push it to the new array
    if (this.yearConverted > 1980) {
      millennials.push(this);
    }
    //iterate through each offspring and combine results
    for (const offspring of this.offspring) {
      const offspringMillennials = offspring.allMillennialVampires;
      millennials = millennials.concat(offspringMillennials);
    }
    return millennials;
  }
}

module.exports = Vampire;

