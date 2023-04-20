function errorHandler(error, req, res, next) {
  console.error(error); // 에러를 터미널에 출력

  // 상태 코드 설정
  let statusCode = res.statusCode;
  if (error.name === 'NotFound') {
    // db에 그런거 없습니다
    statusCode = 404;
  } else if (error.name === 'UnAcceptableType') {
    // 지원되지 않는 Content-Type 헤더 요청(json이 아닌 형식 요청)
    statusCode = 406;
  } else if (error.name === 'Conflict') {
    // 예를들어 이미 있는 유저를 추가할 때
    statusCode = 409;
  } else if (error.name === 'InternalServerError') {
    statusCode = 500;
  } else statusCode = 200; // 응답 성공!

  // JSON 형태로 응답
  res.status(statusCode).json({
    result: 'error',
    message: error.message,
    statusCode: statusCode,
  });
}

export default errorHandler;
