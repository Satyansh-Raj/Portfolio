// Wait for document to be fully loaded
console.log('Script file loaded');

$(document).ready(function() {
    console.log('Document ready in script.js');
    
    try {
        // Check if fonts are loaded
        document.fonts.ready.then(function() {
            console.log("Fonts loaded, starting animation");
            startBootSequence();
        }).catch(function() {
            console.warn("Font loading issue, starting animation anyway");
            startBootSequence();
        });
        
        function startBootSequence() {
            // Add fade-in animation to content elements
            $('.content-wrapper').addClass('fade-in');
            console.log('Added fade-in class');
            
            // Clear the content wrapper to start the boot sequence
            $('.animation-container').empty();
            
            // Boot sequence texts
            const bootSequence = [
                { content: "GRUB loading.", delay: 1000 },
                { content: "Welcome to GRUB!", delay: 2000 },
                { content: "", delay: 500, clear: true },
                { content: "Loading Linux 3.2.0-4-amd64 ...", delay: 200 },
                { content: "Loading initial ramdisk ...", delay: 500 },
                { content: "", delay: 500, clear: true },
                { content: "Loading, please wait ...", delay: 600 },
                { content: "[    2.194785] sd 0:0:0:0: [sda] Assuming drive cache: write through", delay: 200 },
                { content: "[    2.195284] sd 0:0:0:0: [sda] Assuming drive cache: write through", delay: 200 },
                { content: "[    2.196163] sd 0:0:0:0: [sda] Assuming drive cache: write through", delay: 200 },
                { content: "INIT: version 2.88 booting", delay: 200 },
                { content: '[<span class="bl">INFO</span>] Using makefile-style concurrent boot in runlevel S.', delay: 100 },
                { content: '[ <span class="gn">OK</span> ]Starting the hot plug events dispatcher: udevd.', delay: 40 },
                { content: "Synthesizing the initial hotplug events...[    2.700609] piix_smbus 0000:00:07.3: Host SMBus controller not enabled!", delay: 100 },
                { content: "done.", delay: 40 },
                { content: '[ <span class="gn">OK</span> ] Waiting for /dev to be fully populated...', delay: 100 },
                { content: "done.", delay: 200 },
                { content: '[ <span class="gn">OK</span> ] Setting preliminary keymap...done.', delay: 100 },
                { content: '[ <span class="gn">OK</span> ] Activating swap...done.', delay: 100 },
                { content: "Checking root file system...", delay: 200 },
                { content: "done.", delay: 40 },
                { content: '[<span class="bl">INFO</span>]Loading kernel module loop.', delay: 40 },
                { content: '[ <span class="gn">OK</span> ]Cleaning up temporary files... /tmp.', delay: 40 },
                { content: "Mounting local filesystems...done.", delay: 300 },
                { content: '[ <span class="gn">OK</span> ] Setting up console font and keymap...done.', delay: 200 },
                { content: "INIT: Entering runlevel: 2", delay: 300 },
                { content: '[<span class="bl">INFO</span>] Using makefile-style concurrent boot in runlevel 2.', delay: 90 },
                { content: "Starting deferred execution scheduler: atd.", delay: 200 },
                { content: "Starting periodic command scheduler: cron", delay: 80 },
                { content: "Starting system message bus: dbus", delay: 200 },
                { content: "Starting MTA: exim4.", delay: 20 },
                { content: "", delay: 500, clear: true },
                { content: "Debian GNU/Linux 7 Details ttyl", delay: 500 },
                { content: "&nbsp;", delay: 40 },
                { content: "User login: ", typedContent: "root", delay: 800 },
                { content: "password: ", typedContent: "LAb^^e8accO+RS!n", delay: 500 },
                { content: "Loading portfolio...", delay: 500 },
                { content: "", delay: 250, clear: true }
            ];
            
            // Simulated typing effect function
            function typeEffect(element, text, speed) {
                console.log('Starting type effect for: ' + text);
                let i = 0;
                const interval = setInterval(function() {
                    if (i < text.length) {
                        element.append(text.charAt(i));
                        i++;
                    } else {
                        clearInterval(interval);
                        console.log('Finished typing: ' + text);
                    }
                }, speed);
            }
            
            // Function to play boot sequence
            function playBootSequence(sequence, index, container) {
                if (index >= sequence.length) {
                    // Boot sequence complete, load the portfolio page
                    loadPortfolioPage();
                    return;
                }
                
                const item = sequence[index];
                
                // Clear previous content if needed
                if (item.clear) {
                    container.empty();
                }
                
                const lineElement = $('<div class="boot-line"></div>');
                container.append(lineElement);
                
                if (item.typedContent) {
                    // For login/password prompts
                    const promptElement = $('<span class="prompt-text"></span>').html(item.content);
                    lineElement.append(promptElement);
                    
                    const typedElement = $('<span class="typed-content"></span>');
                    lineElement.append(typedElement);
                    
                    // Add the cursor for typed content
                    const cursor = $('<span class="blink-animation">&nbsp;</span>');
                    typedElement.after(cursor);
                    
                    // Wait a moment before typing
                    setTimeout(function() {
                        typeEffect(typedElement, item.typedContent, 100);
                        
                        // Move to next item after typing
                        setTimeout(function() {
                            cursor.remove();
                            playBootSequence(sequence, index + 1, container);
                        }, item.typedContent.length * 100 + item.delay);
                    }, 500);
                } else {
                    // For regular boot messages
                    lineElement.html(item.content);
                    
                    // Move to next item after delay
                    setTimeout(function() {
                        playBootSequence(sequence, index + 1, container);
                    }, item.delay);
                }
            }
            
            // Function to load the portfolio page
            function loadPortfolioPage() {
                console.log('Boot sequence complete, redirecting to portfolio page');
                window.location.href = 'new.html';
            }
            
            // Start the boot sequence
            const animationContainer = $('.animation-container');
            playBootSequence(bootSequence, 0, animationContainer);
        }
        
        console.log('Script initialization complete');
    } catch (error) {
        console.error('Error in portfolio script:', error);
        document.body.classList.add('js-error');
    }
}); 