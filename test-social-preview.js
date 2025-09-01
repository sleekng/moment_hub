#!/usr/bin/env node

const https = require('https');
const http = require('http');

const baseUrl = 'https://momentshub.org';

const testUrls = [
    '/assets/sharable-log.png',
    '/assets/Logo-single.svg',
    '/favicon.ico',
    '/wishlist-preview.html?id=753&username=phil2&title=Test%20Wishlist&description=Test%20Description',
    '/wish-preview.html?id=123&name=Test%20Wish&description=Test%20Wish%20Description&wishlistId=753&username=phil2',
    '/manifest.json'
];

function testUrl(url) {
    return new Promise((resolve, reject) => {
        const fullUrl = baseUrl + url;
        const client = fullUrl.startsWith('https') ? https : http;
        
        client.get(fullUrl, (res) => {
            console.log(`✅ ${url} - Status: ${res.statusCode} - Content-Type: ${res.headers['content-type']}`);
            resolve({ url, status: res.statusCode, contentType: res.headers['content-type'] });
        }).on('error', (err) => {
            console.log(`❌ ${url} - Error: ${err.message}`);
            reject({ url, error: err.message });
        });
    });
}

async function runTests() {
    console.log('🔍 Testing Social Preview Implementation...\n');
    
    const results = [];
    
    for (const url of testUrls) {
        try {
            const result = await testUrl(url);
            results.push(result);
        } catch (error) {
            results.push(error);
        }
    }
    
    console.log('\n📊 Test Summary:');
    console.log('================');
    
    const successful = results.filter(r => r.status === 200).length;
    const failed = results.length - successful;
    
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    
    if (failed > 0) {
        console.log('\n❌ Failed URLs:');
        results.filter(r => r.error).forEach(r => {
            console.log(`   - ${r.url}: ${r.error}`);
        });
    }
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Use social media debuggers to force re-scraping');
    console.log('2. Test shared links on different platforms');
    console.log('3. Wait for cache propagation (24-72 hours)');
    console.log('4. Check Google Search Console for favicon updates');
}

runTests().catch(console.error);
