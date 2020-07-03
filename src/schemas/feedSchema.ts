export default class FeedSchema {
    static schema = {
        name: 'message',
        properties: {
            id: 'int',
            userID: 'int',
            msm: 'string',
            name: 'string',
            course: 'string'
        }
    };
}
