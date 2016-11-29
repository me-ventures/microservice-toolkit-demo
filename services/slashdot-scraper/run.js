var config = require('config');
var toolkit = require('microservice-toolkit').initFromConfig(config);
var log = toolkit.logger;
var metrics = toolkit.metrics;
var context = toolkit.context;


var FeedParser = require('feedparser')
    , request = require('request');




setInterval(() => {
    var feedparser = new FeedParser();
    var req = request('http://rss.slashdot.org/Slashdot/slashdotMain');

    req.on('error', function (error) {
        // handle any request errors
    });
    req.on('response', function (res) {
        var stream = this;

        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

        stream.pipe(feedparser);
    });

    feedparser.on('error', function(error) {
        log.error(error);
    });
    feedparser.on('readable', function() {
        // This is where the action is!
        var stream = this
            , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
            , item;

        while (item = stream.read()) {
            metrics.increment('new-article');

            var event = {
                platform: config.get('description.platform'),
                article: item
            };

            context.publishToExchange(
                'articles',
                'new-article',
                event
            );
        }
    });
}, 15000);