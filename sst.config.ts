/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-nextjs",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");

    const bucket = new sst.aws.Bucket("MyBucket", {
      public: true,
    });
    new sst.aws.Nextjs("MyWeb", {
      link: [bucket],
      vpc: {
        securityGroups: vpc.securityGroups,
        subnets: vpc.privateSubnets,
      },
    });
  },
});
