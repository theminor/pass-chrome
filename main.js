$(document).ready(function() {


  $("#fileBtn").bind("click", function() {
    $(this).text("Clicked!!");
    chrome.fileSystem.chooseEntry({type: 'openFile'}, function(readOnlyEntry) {
      readOnlyEntry.file(function(file) {
        var reader = new FileReader();
        reader.onerror = function(err) {
          $("#tstPar").text(err);
        };
        reader.onloadend = function(e) {
          $("#tstPar").text(e.target.result);
        };
        reader.readAsText(file);
      });
    });
  });


  $("#dirBtn").bind("click", function() {
    $(this).text("Clicked!!");
    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(readOnlyEntry) {
      function toArray(list) {
        return Array.prototype.slice.call(list || [], 0);
      }

      var dirReader = readOnlyEntry.createReader();
      var entries = [];
      // Keep calling readEntries() until no more results are returned.
      var readEntries = function() {
         dirReader.readEntries (function(results) {
          if (!results.length) {
            var outTxt = "entries: ";
            entries.sort().forEach(function(entry, i) {
              outTxt += entry.name + ", ";
            });
            $("#tstPar").text(outTxt);
          } else {
            entries = entries.concat(toArray(results));
            readEntries();
          }
        }, function(err) { $("#tstPar").text(err);  });
      };
      readEntries();
    });
  });


  $("#decBtn").bind("click", function() {
    // gpg decryption using openpgp.js: https://github.com/openpgpjs/openpgpjs
    $(this).text("Clicked!!");

    // the private key will be stored here - example here uses password "12345"
    var key = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: BCPG C# v1.6.1.0

lQOsBFau0AEBCACelHpGuVeBG+/W5MVfnv4QH6+BlpuV54ZPeeT0kD4a8NLfbN/A
NH4nFH6gKV6T5PBIIBT3fLM3BJyh9BBmZUQZ7zo6fHnoc0KJchBUZnFgX409cDJ5
mIjCBbQHO7+arKiGLQLxXQWHqPpoIvWL6JnwRPiClOooLa9gB5vTJ7Nir9/LtHAi
2CKYvpqY0S/KcJZlLvIYoHqsLHgzlAzPYhBi6mYSZ+amlRkn/WK+PuDb2Cm1EBv/
n2FE4UCUq6enGM3qmylkchhTJVvhew3Qd14N1An8c39wKfKLNgGp03TcfL82RKVM
ufos2O6u6x/Q/VkZvqzRQzeQUs6DUOzCQBm9ABEBAAH/AwMCBjIt99OFIz1gXsDr
8y5EuKgFk6psQgewUFgBKjRbcecPCFT41Ucem+JJF72rRW11wbTjfYbEOAT9Exin
Tb3Gz4oClzsDods20jXFqoHN/EVuWviKf0plXIuZs3njJtxMGgz4ILRwUVGT6/Pr
nkzpIR8EOGavWoN+lAO+8DuWGPGs9cYWBEoUd70kxlRvffa4c//tVEglEmatPY9A
fP2QUu3zcZ7Fng0Vou2KzVAzAg484Ii65N71zdUjGMT0DKhnk6dRB4c02mT8/+lA
RvAcO7Yh1EiXXUEmyV8ryLovSxwU6GFcca2Czk9JGT0NuAOWhUxEHCaBXz1sjtPo
HLNePM3Gf9tiAkW42DNJ169NK+oWsL0V9s11d+Zac1ODNrPjjCN9NsM7xeZ14yD+
vfdYxRY8JiZrq396o7w5sri1XPJiZgr4Y1TZU4zD5900190hJSxWNY5UJRaD+yGm
sO+YPYXwnmh7yO15HTskDdRuY3HTwTAuNLyOXWETtpdlpXOxPQ3Szn2i4WETbGRY
7Z2X/L9AjDBQSDCDIpR6GAR2AlXfu0K8S8qkq25IUZGa0lLu7ael3lT+vYf6xeKi
r6mErsREf9U1O4dNbQAY4PMCkuF801vs/byRjBAhNcAt5aXyZEFjYx8R8pkypEHy
UysH53+Z89cKSG43RwxjTJbFi8glsFuRAQ+2mp61OyZid1eP/fntmHhMBuM1JUFe
ZfRtUkHwNyZ2/QS/mYkADldpgC0k18nb+jHnnebgPvf3KxrAIL0hzCu/Drpa4HmT
nECsktcxKp4b6VvOdeSuOBunUu4iOYOqkGKRrY80ZAPX5C3eHFNbwgW2H6gYTzpC
vY1fQX5ogx/1jVsRkN7pUUmafWTHgS55ilfMBSidTrQNbm9uZUBub25lLmNvbYkB
HAQQAQIABgUCVq7QAQAKCRDp9ZKzDBKMohh6B/4+6VkFx1N0T32V/ZB2hG330aPI
0T0wx5pnl1/oNJlWUoXH7SYb0DSLc2aYiBq/rISirS1XYm9SFkyeTHR6LVV13vvq
af2KUU8bDug2f4l1ZpfSRlvrTcO2yephbX4eK5a0gBhRW9oFqu1vwK1mHtRIQXpR
7mTwzOOOuRp1wPFUupULGLZqZBHg2bAu5YIFmYTclq1G9dw9alJowu+2zpjQCBWv
G4kudpaizs6gr+2bBe8T+DEUpUxf8mZ0y4x572Y9A6cjpMgW1TgEvfYnOozcb/Zm
kGCc1knVfdKe2LNjoGl4Npgyzj+ZaqxZpAhZHDtQDZrIF8gHTUvkuJiN7meL
=la1N
-----END PGP PRIVATE KEY BLOCK-----`;

    var privateKey = openpgp.key.readArmored(key).keys[0];
    privateKey.decrypt('12345');  // example here uses password 12345

    // the encrypted entry will be stored here
    var pgpMessage = `-----BEGIN PGP MESSAGE-----
Version: BCPG C# v1.6.1.0

hQEMA+n1krMMEoyiAQf9HVLGn0n4vwQWCsqE1S2zE9Q/88yHZkqVGAZJfHSTCX0I
ZV6P6BWV4h+SY3+2fIbZSuxWXC6YZWqp2cyGInjGbYkAtU3gnqRrsLo+otmtg2r0
I7I1le2Bx8babuTXKl16lpmyQKMxicwyY/DrHn96vLV0sSdBMa4GLLEQ3e6VrIj5
g/3ngGJFneHZWwddaupB7jOP+H8xwyiGuTuQY6Zr+K8PeDi/uO+wMcuHjUvXihIk
lRBH3z4SPCaWHMSfFtZWzcmFOeS+58+Ax64rWbJgCI3t8zTKDezvs6K1qMPK8gKb
/p73cbLVucp7/sXcCBlTPjJFStoAlzSyZVS8XlKSI8k0TSA7ciFmJPlJ7WKupDK7
Spw4u56VfXiH7b4PFikwsBq85jDmLUS6BKORZM12VslSYDjTqg==
=AVdP
-----END PGP MESSAGE-----`;

    pgpMessage = openpgp.message.readArmored(pgpMessage);
    openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) { // success
      $("#tstPar").text(plaintext); // output the decrypted text
    }).catch(function(err) {  // failure
      $("#tstPar").text(err);
    });
  });





  $("#passBtn").bind("click", function() {
    $(this).text("Clicked!!");
    chrome.fileSystem.chooseEntry({type: 'openFile'}, function(readOnlyEntry) {
      readOnlyEntry.file(function(file) {
        var reader = new FileReader();
        reader.onerror = function(err) {
          $("#tstPar").text(err);
        };
        reader.onloadend = function(e) {
          var pgpMessage = e.target.result;
          fs.root.getFile('/home/john/skey/key', {}, function(readKeyEntry) { // *** not working
            readKeyEntry.file(function(file) {
              var reader2 = new FileReader();
              reader2.onerror = function(err) {
                $("#tstPar").text(err);
              };
              reader2.onloadend = function(e2) {
                var key = e2.target.result;
                var privateKey = openpgp.key.readArmored(key).keys[0];
                privateKey.decrypt('****************');  // **** change to test
                pgpMessage = openpgp.message.readArmored(pgpMessage);
                openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) { // success
                  $("#tstPar").text(plaintext); // output the decrypted text
                }).catch(function(err) {  // failure
                  $("#tstPar").text(err);
                });
              };
              reader2.readAsText(file);
            });
          });
        };
        reader.readAsText(file);
      });
    });
  });



});
