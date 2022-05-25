/**
 * Get the cosine similarity of two strings E.g. =textCosineSimilarity("I love candy","I like candy")
 * @param {string} strA first string
 * @param {string} strA second string
 * @param {mode} mode: "" = case seinsitive or "I"= case insensitive
 * @returns {real} a value vetween 0 and 1.
 * @customfunction
 */

function textCosineSimilarity(strA, strB, mode="") {

  // Adapted from Suman Kunwar's solution
  // https://sumn2u.medium.com/string-similarity-comparision-in-js-with-examples-4bae35f13968

  function termFreqMap(str) {
    var words = str.split(' ');
    var termFreq = {};
    words.forEach(function(w) {
      termFreq[w] = (termFreq[w] || 0) + 1;
    });
    return termFreq;
  }

  function addKeysToDict(map, dict) {
    for (var key in map) {
      dict[key] = true;
    }
  }

  function termFreqMapToVector(map, dict) {
    var termFreqVector = [];
    for (var term in dict) {
      termFreqVector.push(map[term] || 0);
    }
    return termFreqVector;
  }

  function vecDotProduct(vecA, vecB) {
    var product = 0;
    for (var i = 0; i < vecA.length; i++) {
      product += vecA[i] * vecB[i];
    }
    return product;
  }

  function vecMagnitude(vec) {
    var sum = 0;
    for (var i = 0; i < vec.length; i++) {
      sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
  }

  function cosineSimilarity(vecA, vecB) {
    return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
  }

  // Entry point

  // Coerce to string
  strA = strA + "";
  strB = strB + "";

  if (mode=="I")
  {
    strA = strA.toLowerCase();
    strB = strB.toLowerCase();
  }

  var termFreqA = termFreqMap(strA);
  var termFreqB = termFreqMap(strB);

  var dict = {};
  addKeysToDict(termFreqA, dict);
  addKeysToDict(termFreqB, dict);

  var termFreqVecA = termFreqMapToVector(termFreqA, dict);
  var termFreqVecB = termFreqMapToVector(termFreqB, dict);

  return cosineSimilarity(termFreqVecA, termFreqVecB);
}
