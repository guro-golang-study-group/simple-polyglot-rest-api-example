### FLASK 시작하기
#### virtualenv 설치
Flask로 웹 어플리케이션을 만들기 위해서 우선 `virtualenv`라는 프로그램이 필요하다. [virtualenv 공식 홈페이지](https://virtualenv.readthedocs.org/en/latest/)에서는 다음과 같이 표현하고 있다.
> `virtualenv` is a tool to create isolated Python environments.

시스템에 설치되어 있는 파이썬에 영향을 주지 않고, 독립된 파이썬 개발 환경을 만들어준다. 이렇게 생성된 가상의 개발 환경에서는 실행 파일과 라이브러리를 저장할 수 있는 경로가 별도로 제공된다. 아래의 명령어를 이용해서 `virtualevn`를 설치한다. 모든 작업은 Ubuntu 14.04 에서 진행하였다.
```
# sudo apt-get install python-virtualenv
```

#### 가상 개발 환경 생성
먼저 어플리에이션을 위한 디렉토리를 생성한다. `app`이라는 이름으로 생성하도록 하겠다. `virtualevn venv`를 통해서 app 디렉토리 내에 가상 개발 환경을 설치하기 위한 준비를 한다. 해당 디렉토리에 venv이라는 디렉토리가 생성되었음을 확인할 수 있다.
```
# mkdir app
# cd app
# virtualenv venv
New python executable in venv/bin/python
Installing distribute............done.
```

#### virtualenv 실행
가상 개발 환경을 활성화 시켜준다.
```
# . venv/bin/activate
```

#### Flask 설치
아래 명령을 통해서 가상 개발 환경 내에 `Flask` 패키지를 설치한다. 로그가 순차적으로 출력이되는데, `/venv/build` 아래로 Flask 패키지가 설치된 것을 확인 할 수 있다.
```
# pip install Flask
....
{directories}/app/venv/build/Flask/setup.py
....
```

#### 어플리케이션 소스 코드
`app.py` 파일을 생성한 다음 [Flask 공식 홈페이지](http://flask.pocoo.org/docs/0.10/quickstart/#quickstart)에 있는 정말 간단한 예제를 입력해본다.
```
# vim app.py
```
``` python
from flask import Flask
app = Flask(__name__)
 
@app.route('/')
def hello_world():
  return 'Hello World!'
 
if __name__ == '__main__':
  app.run()
```

#### 어플리케이션 실행
`python` 명령을 이용해서 웹 어플리케이션을 실행한다.
```
# python app.py
```

#### 어플리케이션 실행 확인
어플리케이션이 정상적으로 실행되면 다음과 같은 결과가 출력된다.
```
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

## 라우팅 방식
  
     별도 모듈 설치가 필요하며, 모듈을 불러온 후 실행 후 동작 (함수 )

## 미들웨어

     python flask 에서는 미들웨어의 기능을 url_for 이라는 모듈이 대신함, 로깅의 경우 logger 함수를 사용해서 볼 수 있다.

## 핸들러

     flask api 를 통해 status를 불 수 있으며, json을 지원하고 딕셔너리 형태로 읽어올 수 있다.
     comment는 python에서 사용하는 것과 동일하다
