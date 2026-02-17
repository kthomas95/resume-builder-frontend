import { GenericSchema, InferIssue, InferOutput, safeParse } from "valibot";
import { Either, Left, Right } from "purify-ts";

export const parseToEither = <S extends GenericSchema>(
    schema: S,
    value: unknown,
): Either<[InferIssue<S>, ...InferIssue<S>[]], InferOutput<S>> => {
    const result = safeParse(schema, value);

    return result.success ? Right(result.output) : Left(result.issues);
};
