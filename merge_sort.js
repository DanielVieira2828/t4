const fs = require("fs");
const { performance } = require("perf_hooks"); // Importa performance para medir o tempo

// Função de leitura do arquivo
function readArrayFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf-8");
    // Converte os dados do arquivo para um array de números separados por espaços
    const array = data
      .split(/\s+/) // Divide a string por espaços (ou quebras de linha)
      .map((num) => parseFloat(num.trim())); // Remove espaços extras e converte para números
    return array;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
    return null;
  }
}

// Função de Merge Sort
function mergeSort(array) {
  if (array.length <= 1) {
    return array; // Base da recursão: arrays com 1 ou 0 elementos já estão ordenados
  }

  // Divide o array em duas metades
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  // Recursivamente ordena cada metade
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combina as duas metades ordenadas
  return merge(sortedLeft, sortedRight);
}

// Função para combinar dois arrays ordenados
function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  // Combina elementos dos dois arrays até que um seja esgotado
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Adiciona os elementos restantes
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Principal
function main() {
  const filename = "array_data.txt";
  const array = readArrayFromFile(filename);

  if (array) {
    console.log("Array original:", array);

    // Medindo o tempo de execução do Merge Sort
    const startTime = performance.now(); // Início
    const sortedArray = mergeSort(array);
    const endTime = performance.now(); // Fim

    console.log("Array ordenado:", sortedArray);
    console.log(`Tempo de execução do Merge Sort: ${(endTime - startTime).toFixed(4)} ms`);
  } else {
    console.error("Falha ao processar o arquivo.");
  }
}

// Executa o programa
main();
