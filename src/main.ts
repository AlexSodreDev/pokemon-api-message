import AWS, { SQS, SES } from 'aws-sdk'

(async function main () {
  while (true) {
    try {
      const queueUrl = 'here you place the url of queue in AWS SQS'

      const sqs = new AWS.SQS({ region: 'place your aws region here' })
      const ses = new AWS.SES({ region: 'place your aws region here' })

      const params: SQS.Types.ReceiveMessageRequest = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10
      }

      const result = await sqs.receiveMessage(params).promise()
      result?.Messages?.map(async message => {
        console.log(message.Body)
        await sqs.deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle
        }).promise()
      })

      const to = 'destinationEmail@mail.com'

      const mailParams: SES.Types.SendEmailRequest = {
        Destination: {
          ToAddresses: [to]
        },
        Message: {
          Body: {
            Text: { Data: 'Here goes the message' }
          },
          Subject: { Data: 'Here goes the subject' }
        },
        Source: 'fromEmail@mail.com'
      }

      const mail = await ses.sendEmail(mailParams).promise()
      console.log(mail)
    } catch (err) {
      console.log(err)
    }
  }
})()
