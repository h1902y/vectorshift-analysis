> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data Types

> Ensure workflows are valid and reliable by validating data types

To ensure that nodes operate with each other in well-formed ways, each node's inputs and outputs are tagged to accept specific types.
We refer to these types as Data Types, as they describe the kind of data that moves between workflow nodes.
Type-checking can help catch errors before workflows are saved and run.
For instance, it isn't well-formed to have a language model node take in image data in the system prompt, so we restrict the LLM system prompt to take in `Text`.

Type-checking makes sure that any values you place in a node's input are of a compatible type for that input. For example, inputs of type `Text` will only accept values that are compatible with `Text`.

The following discussion is a bit more technical.
In summary, you may receive errors when connecting nodes where the data types don't match.
If so, you'll receive a descriptive error message explaining where the errors are.

## Type Hierarchy

Some Data Types are sub-types of others: any `Integer` value passed around in a workflow, for instance, can be treated as a `Decimal`, and many Data Types can be represented using `Text`.
If a type `T` is a sub-type of a different type `U`, you will be able to use values of type `T` in any input of type `U`.

The VectorShift platform currently supports the following basic Data Types, with levels of indentation indicating sub-types.

* `Text`
  * `Decimal`
    * `Integer`
  * `JSON`
* `File`
  * `Image`
  * `Audio`
  * `CSV`
* `VSObject`
  * `KnowledgeBase`
  * `Pipeline`
  * `Integration`
  * `Transformation`
* `Dropdown`
* `Path` (for more information on this data type, see [Dependencies](/platform/pipelines/dependencies))

In addition, VectorShift also has compound Data Types. These types modify an inner type `T`, where `T` can be any basic or compound Data Type:

* `List<T>`: A list of any length containing elements of type `T`. For example, `List<Text>` represents a list of elements, each of which has a type of `Text`. For an input of type `List<T>`, you can either provide a single value of type `List<T>`, or you can toggle "Itemize" and provide several values of type `T`.
* `Stream<T>`: A continuous stream of elements of type `T`. For example, `Stream<Text>` represents a continuous stream of `Text` values, like those produced by an LLM with streaming enabled.
