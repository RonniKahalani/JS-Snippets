# JS-Snippets - file
Shows how to use HTML input file element and generate string based image file data.

## Scenario
You need a feature to allow users to drag & drop local files (ex. images), to upload as encoded string values, to be sent the backend database and fetched back to use in HTML img tags on a HTML page.

## Learning
- Enabling Drag & Drop file uploads.
- Copy data to System clipboard.
- Generate Base64 image string, compatible as img tag source.
- Generate dynamic page content.

## Introduction

### The standard HTML input type file element
The image below illustrates how the default UI component to upload a file looks on different platforms.
We will use such a standard file component, but prettify and Drag & Drop enable it, with the JS tool, called Dropify.

![image](https://user-images.githubusercontent.com/8819076/196126325-6c4fab22-a38c-4bdd-83a6-e217ecb06f2c.png)

### Using Dropify
See more about [Dropify](http://jeremyfagis.github.io/dropify/)

In this example we render the list of local files added for upload, and generate a Base64 encoded string, which can be used in img tags or be saved/posted to the backend, for later rendering.

This is how it looks before adding any files.

![image](https://user-images.githubusercontent.com/8819076/196125676-514c1751-b0aa-4376-ac32-e29b24678257.png)

This is how it looks after adding some image files.

![image](https://user-images.githubusercontent.com/8819076/196125064-bffde655-d7b7-4f15-951a-916efc75378e.png)

