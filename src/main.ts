import AWS, { SQS } from 'aws-sdk'

(async function main() {
  while (true) {
    try {
      const queueUrl = 'https://sqs.us-east-2.amazonaws.com/965030996174/pokemon_send_email'

      const sqs = new AWS.SQS({ region: 'us-east-2' })

      const params: SQS.Types.ReceiveMessageRequest = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10
      }

      const result = await sqs.receiveMessage(params).promise()
      result?.Messages?.map(async message => {
        console.log(message.Body)
      })
    } catch (err) {
      console.log(err)
    }
  }
})()
