export interface User {
  id: string; // Opcional, caso uses id no backend
  name: string;        // Nome completo do usuário
  password: string;
  email: string;       // Email do usuário
  status: 'CREATED' | 'ACTIVE' | 'INACTIVE';
  phone: string;       // Número de telefone do usuário
  login: string;    // Nome de usuário
  role: 'ADMIN' | 'USER'; // Papel do usuário (pode ser ADMIN ou USER)
  createdAt: string;   // Data de criação do usuário (em formato ISO 8601)
}
