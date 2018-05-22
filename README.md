## ELEARNING BACKEND ##

This repository is used for the server part of the elearing project.
Version: 1.0.0

## Development server ##
Run **node server.js**. Navigate to http://localhost:3000/. 

## Software ##

* [MongoDB](https://www.mongodb.com/)
* [Node 8.9.4 LTS](https://nodejs.org/en/)


## Install ##
* In the directory "\elearning-backend\server\Configs\servConfig.js" change the address to the server and change the name of the database.
* npm install
* RUN **node migration.js** to add test data to the database
* RUN **node server.js**
 
# Response error object #

```
{
    message: "",
    status_code: 
}
```

# Authorization #
```
POST /api/auth/login
``` 
Method: authController.login
Request body:
```
    {
        email: ""
        password: ""
    }
```
Response example: 
```
        {
            token: "",
            user: {
                id: 1,
                full_name: "",
                email: ""
            }
        }
```


# Check area #
```
GET /api/auth/verify
```
Method: authController.verify
Response: true or false  

# Signup #
```
POST /api/auth/signup
```
Method: authController.signup
Response: true or false  

# User areas #
Get available to the user areas
```
GET api/areas/user
```
Method: areaController.getUserAreas
Response: 
```
[
    {
        id: 1,
        title: "",
        isUserHaveAccess: true or false
    }
]
```

# Check area title #
```
GET api/areas/get/:areaTitle
```
Method: areaController.getAreaTitle
Response example: 
```
    {
        id: 1,
        title: ""
    }
```

# User stats #
```
GET api/stats/attempts
```
Method: statsController.getAttempts
Response example: 
```
  [
    {
        "id": 14,
        "start_date": "2018-02-02T21:17:56.787Z",
        "end_date": "2018-02-02T21:18:19.853Z",
        "topics": [
            {
                "id": 1,
                "title": "Probability & Statistics",
                "correctly": 3
            },
            {
                "id": 2,
                "title": "Algebra & Number",
                "correctly": 2
            },
            {
                "id": 3,
                "title": "Measurement & Geometry",
                "correctly": 3
            }
        ],
        "total_score": 8
    }
]
```

# Questions #
```
GET api/questions/
```
Method: questionController.get
Response example: 
```
  [
    {
        "id": 1,
        "text": "Which of these phrases best describes Bellview as a holiday destination",
        "description": "",
        "decription_type": "", 
        "explanation":"",
        "was_answered": false,
        "answers": [
            {
                "id": 1,
                "text": "It is a romantic, luxury, island getaway for all groups",
                "type":"",
                "question_id": 1
            },
            {
                "id": 2,
                "text": "It is an isolated island for people to escape",
                "type":"",
                "question_id": 1
            },
            {
                "id": 3,
                "text": "It offers strict packages for honeymooners",
                "type":"",
                "question_id": 1
            },
            {
                "id": 4,
                "text": "It is a destination for adventurous and risk-taking people",
                "type":"",
                "question_id": 1
            }
        ]
    }    
]
```

# Result questions from ID #
```
GET api/user-results/:attemptId
```
:attemptId - id test
Method: userResultsController.getResults
Response example: 
```
{
    "score": 8,
    "questions": [
        {
            "id": 1,
            "text": "Which of these phrases best describes Bellview as a holiday destination",
            "description": "",
            "decription_type": "", 
            "explanation":"",            
            "categories": [
                {
                    "id": 1,
                    "title": "Probability & Statistics"
                }
            ],
            "was_answered_correctly": true,
            "answers": [
                {
                    "id": 1,
                    "text": "It is a romantic, luxury, island getaway for all groups",
                    "is_correct": 1,
                    "question_id": 1,
                    "is_user_answer": false
                },
                {
                    "id": 2,
                    "text": "It is an isolated island for people to escape",
                    "is_correct": 0,
                    "question_id": 1,
                    "is_user_answer": false
                },
                {
                    "id": 3,
                    "text": "It offers strict packages for honeymooners",
                    "is_correct": 0,
                    "question_id": 1,
                    "is_user_answer": false
                },
                {
                    "id": 4,
                    "text": "It is a destination for adventurous and risk-taking people",
                    "is_correct": 0,
                    "question_id": 1,
                    "is_user_answer": false
                }
            ]
        }     
    ],
    "completion_time": "00:00:23",
    "area_title": "literacy"
}
```

# Create result test #
```
POST api/user-results
```
Input data:

```
{
    "area_title": "numeracy",
    "start_date": "2018-02-04T22:56:14.013Z",
    "end_date": "2018-02-04T22:56:31.102Z",
    "answers": [
        {
            "id": 4,
            "text": "It is a destination for adventurous and risk-taking people",
            "question_id": 1
        },
        {
            "id": 8,
            "text": "Tour guides and hospitality workers",
            "question_id": 2
        },
        {
            "id": 12,
            "text": "\"We can provide Bellview overwater bungalow packages in addition to beachfront island stays.\"",
            "question_id": 3
        },
        {
            "id": 16,
            "text": "Cruise on an ocean liner",
            "question_id": 4
        },
        {
            "id": 20,
            "text": "Is angry with the sleeping bag",
            "question_id": 5
        },
        {
            "id": 24,
            "text": "The room is bare",
            "question_id": 6
        },
        {
            "id": 28,
            "text": "Noisily",
            "question_id": 7
        },
        {
            "id": 28,
            "text": "Noisily",
            "question_id": 8
        },
        {
            "id": 28,
            "text": "Noisily",
            "question_id": 9
        }
    ]
}
```
Method: userResultsController.create
Response id user test answer

Response example: 
```
{
    "id":18
}
```

## Example question JSON ##
```
[
    {
        "id": id type number,
        "text": "question",
        "description": "", can have two meanings text if _description_type_ text and link to image if _description_type_ image.
        "description_type": "", - can have two meanings text or image
        "explanation": "", - explanation of the answer
        "was_answered": false, - always leave such
        "answers": [ 1,2,3,4], ids - answers
        "answerIds": [],  - always leave such
        "area_id": 2, - id area. literacy - 1, number - 2, writing - 3.
        "topic_id": 1, - id topic, 1 - Probability & Statistics, 2 - Algebra & Number, 3 - Measurement & Geometry. I do not know other topics
        "topicId" : {} - always leave such
    },
    etc.
]
```

## Example answer JSON ##
```
{
        "id": 7,
        "text": "Families and couples", can be url(relative) to image if type image or text if type text
        "type": "text", can be image or text        
        "is_correct": true
} - if answer correct

{
        "id": 7,
        "text": "Families and couples", can be url(relative) to image if type image or text if type text
        "type": "text", can be image or text        
} - if answer not correct
```

## Check text ##
```
POST api/writing/check-text
```
Method: writingController.checkText

Input data: 

* user_id - number
* time - number in milliseconds
* text - string
* count_words - number

Example Response:

```
{
    "attempt_id": 2
}
```
 
## Get writing attempt ##

```
POST api/writing/writing-result
```
Method: writingController.getWritingResults

Input data: 

* user_id - number
* attempt_id - number

Example Response:

```
{
    "_id": "5a80853d829dd82e509b6515",
    "time": 200,
    "id": 1,
    "langTool": "{\"software\":{\"name\":\"LanguageTool\",\"version\":\"4.0\",\"buildDate\":\"2018-02-03 13:24\",\"apiVersion\":1,\"status\":\"\"},\"warnings\":{\"incompleteResults\":false},\"language\":{\"name\":\"English (Australian)\",\"code\":\"en-AU\"},\"matches\":[{\"message\":\"This sentence does not start with an uppercase letter\",\"shortMessage\":\"\",\"replacements\":[{\"value\":\"Hello\"}],\"offset\":0,\"length\":5,\"context\":{\"text\":\"hello\",\"offset\":0,\"length\":5},\"sentence\":\"hello\",\"rule\":{\"id\":\"UPPERCASE_SENTENCE_START\",\"description\":\"Checks that a sentence starts with an uppercase letter\",\"issueType\":\"typographical\",\"category\":{\"id\":\"CASING\",\"name\":\"Capitalization\",\"baseline\":\"Grammar & Punctuation\"}}}]}",
    "text": "hello",
    "count_words": 20,
    "__v": 0
}
```

