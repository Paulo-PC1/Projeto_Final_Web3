// Nomes das authorities exatamente como gravadas na tabela `permission` (V05) e
// como chegam no claim "authorities" do JWT. Centralizar aqui evita "strings mágicas"
// espalhadas pelos templates e guards.
export const Permission = {
  SEARCH_CATEGORY: 'ROLE_SEARCH_CATEGORY',
  REGISTER_CATEGORY: 'ROLE_REGISTER_CATEGORY',
  REMOVE_CATEGORY: 'ROLE_REMOVE_CATEGORY',

  SEARCH_EXERCISE: 'ROLE_SEARCH_EXERCISE',
  REGISTER_EXERCISE: 'ROLE_REGISTER_EXERCISE',
  REMOVE_EXERCISE: 'ROLE_REMOVE_EXERCISE',

  SEARCH_ANSWER: 'ROLE_SEARCH_ANSWER',
  REGISTER_ANSWER: 'ROLE_REGISTER_ANSWER',
  REMOVE_ANSWER: 'ROLE_REMOVE_ANSWER'
} as const;
