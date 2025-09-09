class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const ANIMAIS = {
      "Rex":   { tipo: "cao",   brinquedos: ["RATO", "BOLA"], ignoraOrdem: false },
      "Mimi":  { tipo: "gato",  brinquedos: ["BOLA", "LASER"], ignoraOrdem: false },
      "Fofo":  { tipo: "gato",  brinquedos: ["BOLA", "RATO", "LASER"], ignoraOrdem: false },
      "Zero":  { tipo: "gato",  brinquedos: ["RATO", "BOLA"], ignoraOrdem: false },
      "Bola":  { tipo: "cao",   brinquedos: ["CAIXA", "NOVELO"], ignoraOrdem: false },
      "Bebe":  { tipo: "cao",   brinquedos: ["LASER", "RATO", "BOLA"], ignoraOrdem: false },
      "Loco":  { tipo: "jabuti", brinquedos: ["SKATE", "RATO"], ignoraOrdem: true }
    };

    const BRINQUEDOS_VALIDOS = ["RATO", "BOLA", "CAIXA", "NOVELO", "LASER", "SKATE"];

    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const ordem = ordemAnimais.split(',').map(a => a.trim());

    // pra ver se nao tem brinquedo duplicado  
    const set1 = new Set(brinquedos1);
    const set2 = new Set(brinquedos2);
    if (set1.size !== brinquedos1.length || set2.size !== brinquedos2.length) {
      return "Brinquedo inválido";
    }

    // pra ver se os brinquedos sao validos
    const todosBrinquedos = [...brinquedos1, ...brinquedos2];
    for (let b of todosBrinquedos) {
      if (!BRINQUEDOS_VALIDOS.includes(b)) {
        return "Brinquedo inválido";
      }
    }

    // pra ver se tem bicho duplicado ou invalido
    const setAnimais = new Set(ordem);
    if (setAnimais.size !== ordem.length) return "Animal inválido";
    for (let a of ordem) {
      if (!ANIMAIS[a]) return "Animal inválido";
    }

    // pra ver se os brinquedo tao na ordem certa
    function contemBrinquedos(brinquedosPessoa, favoritos, ignoraOrdem) {
      if (ignoraOrdem) {
        return favoritos.every(b => brinquedosPessoa.includes(b));
      }
      let i = 0;
      for (let b of brinquedosPessoa) {
        if (b === favoritos[i]) i++;
        if (i === favoritos.length) return true;
      }
      return false;
    }

    const adotadosPorPessoa = { 1: [], 2: [] };
    const resultado = [];

    for (let nomeAnimal of ordem) {
      const animal = ANIMAIS[nomeAnimal];
      const pode1 = contemBrinquedos(brinquedos1, animal.brinquedos, animal.ignoraOrdem);
      const pode2 = contemBrinquedos(brinquedos2, animal.brinquedos, animal.ignoraOrdem);

      let adotante = null;

      // se todo mundo pode ngm pode
      if (pode1 && pode2) {
        adotante = null;
      } else if (pode1) {
        adotante = 1;
      } else if (pode2) {
        adotante = 2;
      }

      // so da pra ter 3 bicho 
      if (adotante && adotadosPorPessoa[adotante].length >= 3) {
        adotante = null;
      }

      // Loco ta carente
      if (nomeAnimal === "Loco" && adotante) {
        if (adotadosPorPessoa[adotante].length < 1) {
          adotante = null;
        }
      }

      if (adotante) {
        adotadosPorPessoa[adotante].push(nomeAnimal);
        resultado.push(`${nomeAnimal} - pessoa ${adotante}`);
      } else {
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }

    return resultado.sort((a, b) => a.localeCompare(b));
  }
}

export { AbrigoAnimais as AbrigoAnimais };