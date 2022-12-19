const testExample = `interface TestResult {
    input: string;
    reason: string;
    expected_output: string;
    actual_output: string;
    isHide: boolean;
    success: boolean;
}
    
const executeTest = ():TestResult[] => { 
  const testResults = [];
  const inputs = [{a:3,b:3},{a:4,b:4}];
  const expectedOutputs = [6,8];
  const hiden = [false,false];
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const expectedOutput = expectedOutputs[i];
    const isHide = hiden[i];
    const actualOutput = sum(input.a,input.b);
    const success = actualOutput === expectedOutput;
    const reason = success ? 'Success' : 'Fail';
    testResults.push({ reason,input,expected_output:expectedOutput,actual_output:actualOutput,isHide,success });
  }
  return testResults;
}`;

const codeExample = `const sum = (a:number, b:number):number => {
    // some code here
    return a + b;
  }
`;

let executeCode = JSON.stringify(
  `#include <iostream>
using namespace std;

int square(int n) {
  return n * n;
}
#include <vector>
#include <string>

struct TestResult {
  bool succeeded;
  std::string reason;
  std::string input;
  std::string expected_output;
  std::string actual_output;
  bool hidden;
};

std::vector<TestResult> executeTests() {
  std::vector<int> inputs = {0, 1, 2, 5};
  std::vector<int> expected_outputs = {0, 1, 4, 25};
  std::vector<bool> hide_test = {false, false, false, false};
  std::vector<TestResult> results;
  
  for (int i = 0; i < inputs.size(); i++) {
    results.emplace_back(TestResult());
    auto result = &(results.back());
    
    result->input = "square(" + std::to_string(inputs[i]) + ")";
  	result->expected_output = std::to_string(expected_outputs[i]);
  	
    auto actual_output = square(inputs[i]);
    result->actual_output = std::to_string(actual_output);
    result->hidden = hide_test[i];
    
    if (actual_output == expected_outputs[i]) {
      result->reason = "Succeeded";
      result->succeeded = true;
    } else {
      result->reason = "Incorrect Output";
      result->succeeded = false;
    }
  }
 
  return results;
}

#include <iostream>

int main() {
  std::vector<TestResult> results = executeTests();

  if (results.size() == 0) {
    return 0;
  }

  std::string output = "<__educative_test_results__>{\"test_results\": [";

  int count = 0;
  for (const TestResult& result : results) {
    if (count > 0) {
      output += ",";
    }
    output += "{";
    output += "\"reason\": \"" + result.reason + "\",";
    output += "\"input\": \"" + result.input + "\",";
    output += "\"expected_output\": \"" + result.expected_output + "\",";
    output += "\"actual_output\": \"" + result.actual_output + "\",";

    std::string succeededStr = result.succeeded ? "true" : "false";
    std::string hidden = result.hidden? "true" : "false";

    output += "\"succeeded\": " + succeededStr + ",";
    output += "\"hidden\": " + hidden + "}";

    count++;
  }


  output += "]}</__educative_test_results__>";

  std::cout << output;
  return 0;
}
`,
);

executeCode = executeCode.replace(/"/g, '\\"');

// replace \n with \r\n
executeCode = executeCode.replace(/\\n/g, "\\r\\n");

export { testExample, codeExample, executeCode };

const square = (x: number | undefined) => {
  if (x === undefined) {
    return 0;
  }
  return x * x;
};
export class TestResult {
  succeeded: boolean;
  reason: string;
  input: string;
  expected_output: string;
  actual_output: string;

  constructor(
    succeeded: boolean,
    reason: string,
    input: string,
    expected_output: string,
    actual_output: string,
  ) {
    this.succeeded = succeeded;
    this.reason = reason;
    this.input = input;
    this.expected_output = expected_output;
    this.actual_output = actual_output;
  }
}

function executeTests() {
  const inputs = [0, 1, 2, 5];
  let expected_results = [0, 1, 4, 25];
  let results = [];

  for (let i = 0; i < inputs.length; i++) {
    let output = square(inputs[i]);
    let succeeded = false;
    let reason = "Incorrect Output!";

    if (output == expected_results[i]) {
      succeeded = true;
      reason = "Succeeded";
    }

    let result = new TestResult(
      succeeded,
      reason,
      String(inputs[i]),
      String(expected_results[i]),
      String(output),
    );
    // results.push(result);
  }

  return results;
}
function main() {
  let results = executeTests();
  let output = { test_results: results };
}

main();
