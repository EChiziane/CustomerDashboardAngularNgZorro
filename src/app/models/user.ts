export interface User {
  nome: string;        // Nome completo do usuário
  email: string;       // Email do usuário
  status: string;
  phone: string;       // Número de telefone do usuário
  userName: string;    // Nome de usuário
  role: 'ADMIN' | 'USER'; // Papel do usuário (pode ser ADMIN ou USER)
  createdAt: string;   // Data de criação do usuário (em formato ISO 8601)
}
