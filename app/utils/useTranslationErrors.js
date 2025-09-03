export default function (errorMessage) {
  const errors = {
    ECONNREFUSED: 'Ошибка сети',
    'Bad request': 'Некорректные данные',
    Forbidden: 'Доступ запрещен',
    'Invalid username or password': 'Неверный e-mail или пароль',
    'Invalid verification code': 'Неверный код подтверждения',
  };

  return errors[errorMessage] || errorMessage;
}
