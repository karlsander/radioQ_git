Ext.define("radioQ.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',
        fullscreen: true,

        items: [
        	{
                title: 'Hören',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Livestream'
                    },
                   
                    {
            xtype: 'toolbar',
            docked: 'bottom',
            defaults: {
                xtype: 'button',
                handler: function() {
                    var container = this.getParent().getParent(),
                        // use ComponentQuery to get the audio component (using its xtype)
                        audio = container.down('audio');

                    audio.toggle();
                    this.setText(audio.isPlaying() ? 'Pause' : 'Play');
                }
            },
            items: [
                { text: 'Pause', flex: 1 }
            ]
        },
                    {
                    xtype : 'audio',
                	hidden: true,
                	autoResume: true,
                	url   : 'http://stream.radioq.de:8000/gross.mp3'
                    },
                    {
	                    xtype: 'image',
	                    src: 'resources/images/q.jpg'
                    },
                    {
	                    html: 
                        '<div style="text-align:center;"><img src="resources/images/q.jpg" /><h1>Playlist (ö)</h1></div>'
                     ,
	                    styleHtmlContent: true
                    }
                    ]
              },
        
        
                        
             {
                    xtype: 'nestedlist',
                    title: 'Features',
                    iconCls: 'bookmarks',
                    displayField: 'title',
                    
                    
                    
                    store: {
                        type: 'tree',

                        fields: [
                            'title', 'link', 'author', 'contentSnippet', 'content',
                            {name: 'leaf', defaultValue: true}
                        ],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'jsonp',
                            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.radioq.de/feed/',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    },
                    
                    detailCard: {
        xtype: 'panel',
        scrollable: true,
        styleHtmlContent: true
    },

    listeners: {
        itemtap: function(nestedList, list, index, element, post) {
            this.getDetailCard().setHtml(post.get('content'));
        }
    }
                },
            
                {
                    title: 'Kontakt',
                    iconCls: 'compose',
                    xtype: 'formpanel',
                    url: 'contact.php',
                    layout: 'vbox',

                    items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Mail an Q'
                    },
                        {
                            xtype: 'fieldset',
                            title: 'Mail an Radio Q',
                            instructions: 'E-Mail Adresse andgeben wenn eine Antwot gewünscht wird',
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Deine Nachricht'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Senden',
                            ui: 'confirm',
                            handler: function() {
                                this.up('formpanel').submit();
                            }
                        }
                    ]
                }        ]
    }
});
