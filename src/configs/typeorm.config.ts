import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {

	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'board-app',
	entities: [__dirname + "/../**/*.entity.{js,ts}"],  //npm i -D @types/node Enfifies 를 이용해서 데이터 베이스 테이블 생성. 엔티티 파일 위치 설정
	synchronize: true //true 값을 주면 앱이 다시 실행할 때 엔티티 안에서 수정된 컬럼의 길이나 타입, 변경값을 해당 테이블에 Drop 한 수 다시 생성해 줌.

}