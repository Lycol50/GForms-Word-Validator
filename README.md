# GForms Word Validator
This repository is a combination of snippets and codes from [GForms-to-Discord](https://github.com/princepines/Google-Forms-to-Discord) and more.
## How to use this?
1. To use this, first create a form on Google Forms
2. Then go to Code Editor (3 dots on top-right, then Code Editor)
3. Paste the code from code.gs
4. Go back to form and specify the form to get the source (use array counting per question)
```
If you have 10 questions and want to use question 6
The question is located in array number 5
```
5. Then edit the [line 44](https://github.com/Lycol50/GForms-Word-Validator/blob/705bb369858ddabcf0e41f9e01928c65398bbed6/code.gs#L44), inside the `itemResponses[]`, specify the array to be used (Read Step 4)
6. Then Save use `Ctrl+S`
7. Then follow the [Step 5 in order to get it published to discord](https://github.com/princepines/Google-Forms-to-Discord)
